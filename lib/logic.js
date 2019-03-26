'use strict';
/*
  Write your transaction processor functions here
 */

/*
  Sample transaction
  @param {voting.vote} vote
  @transaction
 */
function vote(vv) {
    if (!vv.canVoteAsset.hasVoted) {
        vv.candidateAsset.totalVote = vv.candidateAsset.totalVote + 1;
        return getAssetRegistry('voting.candidate')
            .then(function (assetRegistry) {
                return assetRegistry.update(vv.candidateAsset);
            })
            .then(function () {
                return getAssetRegistry('voting.canVote')
                    .then(function (assetRegistry) {
                        vv.canVoteAsset.hasVoted = true;
                        return assetRegistry.update(vv.canVoteAsset);
                    })
            });
    } else {
        throw new Error('Vote already submitted!');
    }
}